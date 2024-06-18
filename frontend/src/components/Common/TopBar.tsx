import { Flex, Text, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import useAuth, { isLoggedIn,  } from "../../hooks/useAuth"; // 确保从 useAuth 中导入 logout 方法
import { ChevronDownIcon } from '@chakra-ui/icons'; // 导入 ChevronDownIcon

// ... 其他代码
const TopBar = () => {
  const { user, isLoading, error ,logout} = useAuth();

  return (
    <Flex width="full" px="6" py="4" justify="space-between" align="center" bgColor="gray.100">
      <Text fontSize="lg" fontWeight="bold">
        英阅EngRead
      </Text>
      {isLoggedIn() ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {`欢迎, ${user?.full_name}`} 
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logout}>注销</MenuItem> 
          </MenuList>
        </Menu>
      ) : (
        <Button colorScheme="blue" as={RouterLink} to="/login">
          登录
        </Button> // 用户未登录，显示登录按钮
      )}
    </Flex>
  );
};

export default TopBar;