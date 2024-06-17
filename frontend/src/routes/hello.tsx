import {
    Button,
    Container,
    Flex, // 导入Flex组件
    Heading,
    VStack,
    Text
} from "@chakra-ui/react"
import {
    Link as RouterLink,
    createFileRoute,
    redirect,
} from "@tanstack/react-router"

import useAuth, { isLoggedIn } from "../hooks/useAuth"

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
    // 使用Flex组件使内容竖直居中
    return (
        <Flex direction="column" align="center" justify="center" height="100vh">
            <Container centerContent maxW="xl">
                <VStack spacing={4} align="stretch">
                    <Heading as="h1" size="2xl" textAlign="center">
                        欢迎来到我们的网站！
                    </Heading>
                    <Text fontSize="lg" textAlign="center">
                        这是一个示例页面，展示如何使用 Chakra UI 和 React Router 创建一个简单的欢迎页面。
                    </Text>
                    <Button colorScheme="blue" as={RouterLink} to="/login">
                        开始使用
                    </Button>
                    <Button variant="outline" as={RouterLink} to="/about">
                        了解更多
                    </Button>
                </VStack>
            </Container>
        </Flex>
    )
}