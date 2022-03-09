import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { scoreState } from "@state/atoms";
import { Box, Contain, Flex, Text, Stack } from "@components/system";
import { questionCategories } from "@constants/index";

export const Header: React.FC = () => {
  const score = useRecoilValue(scoreState);
  const router = useRouter();

  return (
    <Box
      as="header"
      boxShadow="l"
      maxHeight={["2.6rem", null, "3rem"]}
      height="100%"
      bg="primary800"
      color="white"
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
          <Box as="nav">
            <Stack as="ul" direction="row" gap={2}>
              {Object.values(questionCategories).map(
                (category: string, i: number) => (
                  <Box as="li" key={i}>
                    <Link
                      href={`/?category=${category.toLowerCase()}`}
                      passHref
                    >
                      <a
                        href="#"
                        onClick={() => {
                          router.push({
                            pathname: "/",
                            query: { category: category.toLowerCase() },
                          });
                        }}
                      >
                        <Text
                          singleLine
                          fontWeight="600"
                          backgroundColor={
                            router.query.category === category.toLowerCase()
                              ? "primary50"
                              : "transparent"
                          }
                          color={
                            router.query.category === category.toLowerCase()
                              ? "primary700"
                              : "white"
                          }
                          px={2}
                          py={1}
                          borderRadius="4px"
                        >
                          {category}
                        </Text>
                      </a>
                    </Link>
                  </Box>
                )
              )}
              <Text fontSize={[2, null, 3]} fontWeight="400">
                {score.score} / {score.outOf}
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Contain>
    </Box>
  );
};
