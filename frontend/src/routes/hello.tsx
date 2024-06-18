import {
    Button,
    Container,
    Flex,
    Heading,
    VStack,
    Text,
    Grid,
    GridItem,
    Box,
    LinkBox,
    LinkOverlay,
    Input,
} from "@chakra-ui/react"
import {
    Link as RouterLink,
    createFileRoute,
    redirect,
} from "@tanstack/react-router"

import useAuth, { isLoggedIn } from "../hooks/useAuth"
import BooksGrid from "../components/Book/BooksGrid"
import { BooksData } from "../components/Book/BookData"
import TopBar from "../components/Common/TopBar"
import SearchBox from "../components/Common/SearchBox"
export const Route = createFileRoute("/hello")({
    component: Hello,
    beforeLoad: async () => {
        // 如果用户已登录，则重定向到首页
        // if (isLoggedIn()) {
        //     throw redirect({
        //         to: "/",
        //     })
        // }


    },
})

function Hello() {
    // 假设这是你的书籍数据
    const books = BooksData()

    const handleSearch = (value: string) => {
        console.log(value)
    }

    return (
        <Flex direction="column" align="center" justify="flex-start" height="100vh">
            <TopBar />
            <Container centerContent maxW="full" justifyContent={"center"}>
                <VStack spacing={20} align="stretch" width="40%">
                    <Heading as="h1" size="2xl" textAlign="center">
                        英阅EngRead
                    </Heading>
                    <Text fontSize="lg" textAlign="center">
                        轻松有趣地学习英语？
                    </Text>


                        <SearchBox onSearch={handleSearch} />


                    {/* 书籍网格 */}
                    <BooksGrid books={books} />
                    {/* 查看全部书籍按钮 */}
                    <Button colorScheme="teal" as={RouterLink} to="/books">
                        查看全部书籍
                    </Button>
                </VStack>
            </Container>
        </Flex>
    )
}