import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import Api from "../../../api/Api";
import {Table, Tbody, Td, Tfoot, Th, Thead, Tr,} from "@chakra-ui/react";

const Categories = () => {
    const [categories, setCategories] = useState();
    const style = {
        cursor: "pointer",
    };
    const fetchCategories = async () => {
        try {
            const res = await Api().get("/categories");
            setCategories(res.data);
        } catch (error) {
            console.log("Error fetch categories: ", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <>
            <Table size="md" mt={5} boxShadow="md" p="6" rounded="md" bg="gray.200">
                <Thead>
                    <Tr>
                        <Th>Category No</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Description</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {categories &&
                        categories.map((category, index) => (
                            <Tr key={index}>
                                <Td>{index}</Td>
                                <Td>{category.name}</Td>
                                <Td isNumeric>{category.description}</Td>
                                <Td
                                    textDecoration={"underline"}
                                    style={style}
                                    color={"whatsapp.600"}
                                >
                                    <Link to={`/qa-managers/categories/${category.id}`}>Modify</Link>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th></Th>
                        <Th>Total</Th>
                        <Th isNumeric>{categories ? categories.length : 0} records</Th>
                    </Tr>
                </Tfoot>
            </Table>

            <Outlet/>
        </>
    );
};

export default Categories;
