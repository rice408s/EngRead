import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Suspense } from "react"
import { type UserPublic, UsersService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
})

const MembersTableBody = () => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const { data: users } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: () => UsersService.readUsers({}),
  })

  return (
    <Tbody>
      {users.data.map((user) => (
        <Tr key={user.id}>
          <Td color={!user.full_name ? "ui.dim" : "inherit"}>
            {user.full_name || "N/A"}
            {currentUser?.id === user.id && (
              <Badge ml="1" colorScheme="teal">
                You
              </Badge>
            )}
          </Td>
          <Td>{user.email}</Td>
          <Td>{user.is_superuser ? "超级管理员" : "普通用户"}</Td>
          <Td>
            <Flex gap={2}>
              <Box
                w="2"
                h="2"
                borderRadius="50%"
                bg={user.is_active ? "ui.success" : "ui.danger"}
                alignSelf="center"
              />
              {user.is_active ? "启用" : "禁用"}
            </Flex>
          </Td>
          <Td>
            <ActionsMenu
              type="User"
              value={user}
              disabled={currentUser?.id === user.id ? true : false}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  )
}

const MembersBodySkeleton = () => {
  return (
    <Tbody>
      <Tr>
        {new Array(5).fill(null).map((_, index) => (
          <Td key={index}>
            <SkeletonText noOfLines={1} paddingBlock="16px" />
          </Td>
        ))}
      </Tr>
    </Tbody>
  )
}

function Admin() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        用户管理
      </Heading>
      <Navbar type={"User"} />
      <TableContainer>
        <Table fontSize="md" size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th width="20%">用户名</Th>
              <Th width="50%">邮箱</Th>
              <Th width="10%">角色</Th>
              <Th width="10%">状态</Th>
              <Th width="10%">编辑</Th>
            </Tr>
          </Thead>
          <Suspense fallback={<MembersBodySkeleton />}>
            <MembersTableBody />
          </Suspense>
        </Table>
      </TableContainer>
    </Container>
  )
}
