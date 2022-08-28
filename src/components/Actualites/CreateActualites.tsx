import { Box, Heading, useToast } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bgColor } from '../../themes/constants/bgColor';
import { FormCreateUpdateActualites, optionsCategorie, ValuesActualies } from './FormCreateUpdateActualites';
import { getLocalStorageToken } from '../../utils/jwtToken';
import axios from 'axios';
import { pathDomaineName } from '../../utils/pathBackEnd';
import { formatOptionsRender } from '../../tools/functions/formatOptionsRender';
import { useUserStore } from '../../store/useUserStore';
import { useActualitesDisplayStore } from '../../store/useActualitesDisplayStore';

export interface CreateActualitesProps {}

export function CreateActualites(props: CreateActualitesProps) {
   const navigate = useNavigate();
   const toast = useToast();

   const { idUserStore, rolesUserStore } = useUserStore();
   const { addActualite, setDisplayActualites } = useActualitesDisplayStore();

   useEffect(() => {
      if (!rolesUserStore.includes('Admin') && !rolesUserStore.includes('Equipe_administrative')) {
         navigate('/actualites');
      }
   }, []);

   // Pour l'editeur de text la previous
   const [contentState, setContentState] = useState('');
   useEffect(() => () => setContentState(''), []);

   const initialValues = {
      title: '',
      categorie: '01',
      content: '',
      file: null,
   };

   const submit = async (values: ValuesActualies, { setSubmitting }: FormikHelpers<ValuesActualies>): Promise<void> => {
      setSubmitting(true);

      if (values.file) {
         const formData = new FormData();
         const operations = {
            query: 'mutation Mutation($createBlogInput: CreateBlogInput!, $file: Upload!) {\r\n  createBlog(createBlogInput: $createBlogInput, file: $file) {\r\n    id\r\n    title\r\n    categorie\r\n    content\r\n    pathImg\r\n    dateCreation\r\n    userCreateur {\r\n      id\r\n      nom\r\n      prenom\r\n    }\r\n  }\r\n}',
            variables: {
               createBlogInput: {
                  title: values.title,
                  categorie: formatOptionsRender(optionsCategorie, parseInt(values.categorie)),
                  content: values.content,
                  userCreateurId: idUserStore,
               },
               file: null,
            },
         };
         const map = { 0: ['variables.file'] };

         formData.append('operations', JSON.stringify(operations));
         formData.append('map', JSON.stringify(map));
         formData.append('0', values.file);

         try {
            const res = await axios({
               method: 'post',
               url: `${pathDomaineName}/graphql`,
               data: formData,
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${getLocalStorageToken()}`,
               },
            });
            toast({
               title: 'Actualité créée',
               status: 'success',
               duration: 3000,
               position: 'top',
               isClosable: true,
            });

            addActualite(res.data.data.createBlog);
            setDisplayActualites();
         } catch (error) {
            console.log(error);
            toast({
               title: 'Erreur création',
               status: 'error',
               duration: 3000,
               position: 'top',
               isClosable: true,
            });
         }
      }
      setSubmitting(false);
      navigate('/actualites');
   };

   const bgBox = bgColor();

   return (
      <Box p={{ base: 3, sm: 9 }} px={{ base: 3, lg: 16 }}>
         <Box p={{ base: 3, sm: 8 }} bgColor={bgBox} borderRadius="lg">
            <Heading as="h2" borderBottom="1px solid orange" mb="10" p="0">
               Créer un article
            </Heading>

            <FormCreateUpdateActualites initialValues={initialValues} submit={submit} setContentState={setContentState} />

            <Box>
               <Heading as="h4" size="md">
                  Previous
               </Heading>
               {parse(contentState)}
            </Box>
         </Box>
      </Box>
   );
}
