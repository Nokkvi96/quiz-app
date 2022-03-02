import Link from "next/link";
import { Icon } from "@components/atoms";

import { Box, Contain, Flex, Text } from "@components/system";

export const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      boxShadow="l"
      minHeight={["4", "5rem", "6rem"]}
      bg="white"
      zIndex={60}
    >
      <Contain display="flex" maxWidth={1440} py={[14, 16, 18]} height="100%">
        <Flex
          flexDirection={["column", null, "row"]}
          justifyContent="space-around"
          gap={[6, 8, 10]}
          alignItems="center"
          width="100%"
          height="100%"
          bg="white"
        >
          <Text fontSize={2} fontWeight="500">
            <Link href="https://github.com/Nokkvi96/quiz-app" passHref>
              <a href="#">
                <Flex>
                  <Icon icon="Github" />
                  <Text ml={2}>Github Repo</Text>
                </Flex>
              </a>
            </Link>
          </Text>
          <Text fontSize={2} fontWeight="400">
            Made With:
            <Text fontSize={2} fontWeight="500">
              <Link href="https://quizapi.io/" passHref>
                <a href="#"> QuizApi</a>
              </Link>
            </Text>
          </Text>
        </Flex>
      </Contain>
    </Box>
  );
};
