import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getDetailIdea, getTotalLike, ideaSelector, totalLikeOfIdeaSelector,} from "../../app/reducers/ideasSlice";
// Chakra UI
import {Box, Button, Heading, Text} from "@chakra-ui/react";
import Comments from "./Comments/Comments";
import PostCommentForm from "../Comments/PostCommentForm";
import LikeIdea from "../LikeIdea/LikeIdea";

const IdeaDetail = () => {
    const {ideaId} = useParams();
    const dispatch = useDispatch();

    const idea = useSelector(ideaSelector);
    const totalLikeIdea = useSelector(totalLikeOfIdeaSelector);

    const handleDownloadPDFFile = () => {
        window.open(`http://127.0.0.1:8000/api/ideas/${ideaId}/download`, '_blank').focus();
    }

    useEffect(() => {
        dispatch(getDetailIdea(ideaId));
        dispatch(getTotalLike(ideaId));
        // Check file PDF of idea
        // handleCheckIdeaHasPDFFile();
    }, [dispatch]);

    return (
        <div>
            <Heading as={"h1"} size={"xl"}>
                Title: {idea?.title}
            </Heading>

            {/* Button dowload file */}
            <Button colorScheme={'blackAlpha'} onClick={handleDownloadPDFFile}>
                Download idea as a pdf file
            </Button>

            <Box
                mt={5}
                p={20}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="blue"
                overflow="hidden"
            >
                <Text fontSize={"xl"} as={"i"} color="gray.500">
                    {idea?.content}
                </Text>
                <Text fontSize={"sm"} align={"right"} color="red.500">
                    Total Like: {totalLikeIdea} <i className="far fa-thumbs-up"></i>
                </Text>
                <Text mt={2} color={"telegram.600"} align={"left"}>
                    Author: {idea?.user?.email}
                </Text>
            </Box>

            {/*Like idea button*/}
            <LikeIdea ideaId={ideaId}/>
            {/* form post comment  */}
            <PostCommentForm ideaId={ideaId}/>

            {/* Comments */}
            <Box>
                <Comments ideaId={ideaId}/>
            </Box>
        </div>
    );
};

export default IdeaDetail;
