import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";

import Api from "../../../api/Api";

const PostIdeaManual = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [resStatus, setResStatus] = useState(null);
  const [error, setError] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFetchCategories = async () => {
    try {
      const res = await Api().get(`/categories`);
      setCategories(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePostIdeaManual = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("category_id", categoryId);
      formData.append("content", content);

      await Api().post(`/staffs/ideas`, formData);
      setContent("");
      setTitle("");
      setCategoryId(1);
      setResStatus(201);
      onClose()
    } catch (error) {
      if (error.response.status === 422) {
        setResStatus(422);
      }
      onClose()
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  return (
    <>
      <Box>
        <FormControl isRequired>
          <FormLabel>Title idea</FormLabel>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="country">Category</FormLabel>
          <Select
            value={categoryId}
            id="category"
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
            placeholder="Select category"
          >
            {categories.map((e) => {
              return (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="first-name">Content</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Enter content of idea here"
          />
        </FormControl>
        {/* <Button
          onClick={handlePostIdeaManual}
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Submit
        </Button> */}

        <Button colorScheme='twitter' onClick={onOpen} mt='2'>Submit</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Terms and Conditions</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              BY USING THE SERVICES, YOU ARE AGREEING, ON BEHALF OF YOURSELF AND THOSE YOU REPRESENT, TO COMPLY WITH AND BE LEGALLY BOUND BY THESE TERMS AS WELL AS OUR PRIVACY POLICY AND ALL APPLICABLE LAWS. IF YOU, FOR YOURSELF OR ON BEHALF OF THOSE YOU REPRESENT, DO NOT AGREE TO ANY PROVISION OF THESE TERMS, YOU MUST, FOR YOURSELF AND ON BEHALF ANY SUCH PERSON(S), DISCONTINUE THE REGISTRATION PROCESS, DISCONTINUE YOUR USE OF THE SERVICES, AND, IF YOU ARE ALREADY REGISTERED, CANCEL YOUR ACCOUNT.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                No, close
              </Button>
              <Button variant='ghost' onClick={handlePostIdeaManual}>Yes, I agree</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      {resStatus === 201 && (
        <Alert variant="solid" mt="2" status="success">
          <AlertIcon />
          Post idea success
          <CloseButton
            onClick={() => {
              setResStatus(null);
            }}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
      {resStatus === 422 && (
        <Alert mt="2" status="error">
          <AlertIcon />
          Please input required field, error post!
          <CloseButton
            onClick={() => {
              setResStatus(null);
            }}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
    </>
  );
};

export default PostIdeaManual;
