import { Box, Divider, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { FormikHelpers } from 'formik';
import parse from 'html-react-parser';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation } from 'urql';
import { useActualitesDisplayStore } from '../../../store/useActualitesDisplayStore';
import { bgColor } from '../../../themes/constants/bgColor';
import { formatOptionsRender } from '../../../tools/functions/formatOptionsRender';
import { toastSuccessError } from '../../../tools/functions/toastSuccessError';
import { getLocalStorageToken } from '../../../utils/jwtToken';
import { pathDomaineName } from '../../../utils/pathBackEnd';
import { ActualiteGrid } from '../DisplayActualitesGrid';
import { FormCreateUpdateActualites, optionsCategorie, ValuesActualies } from '../FormCreateUpdateActualites';

export interface UpdateActuButtonProps {
   blog: ActualiteGrid;
   setBlog: Dispatch<SetStateAction<ActualiteGrid | undefined>>;
   setDisplay: Dispatch<SetStateAction<string>>;
}

export function UpdateActuButton({ blog, setBlog, setDisplay }: UpdateActuButtonProps) {
   const toast = useToast();

   const { updateActualite, setDisplayActualites } = useActualitesDisplayStore();

   const [contentState, setContentState] = useState('');
   useEffect(() => {
      setContentState(blog.content);
      return () => setContentState('');
   }, []);

   const initialValues = {
      title: blog.title,
      categorie: blog.categorie.slice(0, 2),
      content: blog.content,
      file: null,
   };

   const updateBlogImg = async (file: any): Promise<string | undefined> => {
      if (file) {
         const formData = new FormData();
         const operations = {
            query: 'mutation Mutation($blog: UpdateBlogInput!, $file: Upload!) {\r\n  uploadBlogImg(blog: $blog, file: $file)\r\n}',
            variables: { file: null, blog: { id: blog.id } },
         };
         const map = { 0: ['variables.file'] };
         formData.append('operations', JSON.stringify(operations));
         formData.append('map', JSON.stringify(map));
         formData.append('0', file);

         try {
            const response = await axios({
               method: 'post',
               url: `${pathDomaineName}/graphql`,
               data: formData,
               headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${getLocalStorageToken()}`,
               },
            });
            return response.data.data.uploadBlogImg;
         } catch (error) {
            console.log(error);
         }
      }
   };

   const [_, exeUpdateBlogMutation] = useMutation(updateBlogMutation);
   const submit = async (values: ValuesActualies, { setSubmitting }: FormikHelpers<ValuesActualies>): Promise<void> => {
      const { file, categorie, ...rest } = values;
      const variables = {
         updateBlogInput: {
            id: blog.id,
            categorie: formatOptionsRender(optionsCategorie, parseInt(categorie)),
            ...rest,
         },
      };

      setSubmitting(true);
      const { data, error } = await exeUpdateBlogMutation(variables);
      const newPathImg = await updateBlogImg(file);
      setSubmitting(false);

      toastSuccessError(toast, 'Article modifié', 'Erreur modification', data, error);
      if (data && !error) {
         setBlog({ ...blog, ...variables.updateBlogInput, pathImg: newPathImg ?? blog.pathImg });
         updateActualite({ ...blog, ...variables.updateBlogInput, pathImg: newPathImg ?? blog.pathImg });
         setDisplayActualites();
      }
      setDisplay('detail');
   };

   const bgBox = bgColor();

   return (
      <Box p={{ base: 3, sm: 9 }} px={{ base: 3, lg: 16 }}>
         <Box p={{ base: 3, sm: 8 }} bgColor={bgBox} borderRadius="lg">
            <Heading as="h2" borderBottom="1px solid orange" mb="10" p="0">
               Modifier un article
            </Heading>

            <Box mb="10">
               <Heading as="h4" size="md" mb="4">
                  Previous :
               </Heading>
               {parse(contentState)}
            </Box>

            <Divider mb="10" />

            <FormCreateUpdateActualites
               initialValues={initialValues}
               submit={submit}
               setContentState={setContentState}
               isForUpdate
            />
         </Box>
      </Box>
   );
}

const updateBlogMutation = `
mutation Mutation($updateBlogInput: UpdateBlogInput!) {
   updateBlog(updateBlogInput: $updateBlogInput) {
     id
     title
     categorie
     content
     pathImg
     dateCreation
   }
 }
`;
