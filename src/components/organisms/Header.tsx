import Link from "next/link";

import { Box, Contain, Flex, Text } from "@components/system";

export const Header: React.FC = () => {
  return (
    <Box
      as="header"
      boxShadow="l"
      maxHeight={["2.6rem", null, "3rem"]}
      height="100%"
      bg="white"
      zIndex={50}
    >
      <Contain maxWidth={1440} py={[1, null, 2]} height="100%">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Text fontFamily="Lora" fontWeight="regular" fontSize={[3, null, 4]}>
            <Link href="/" passHref>
              <a href="#">Fun Quiz!</a>
            </Link>
          </Text>
          <Text fontSize={[2, null, 3]} fontWeight="600">
            <Link href="mailto:nokkvi96@gmail.com" passHref>
              <a href="#">Hafa samband</a>
            </Link>
          </Text>
        </Flex>
      </Contain>
    </Box>
  );
};
