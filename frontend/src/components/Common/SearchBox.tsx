import React from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

interface SearchBoxProps {
    onSearch: (value: string) => void; // 定义一个回调函数的 prop，用于处理搜索逻辑
    // style?: React.CSSProperties; // 添加这一行
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(inputValue);
    };

    return (
        <InputGroup>
            <Input
                placeholder="搜索书籍..."
                size="md"
                value={inputValue}
                onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleSearchClick}>
                    搜索
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

export default SearchBox;