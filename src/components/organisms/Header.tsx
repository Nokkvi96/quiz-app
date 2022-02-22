import { useEffect } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import { scoreState } from "@state/atoms";
import { Box, Contain, Flex, Text } from "@components/system";
import { questionCategories } from "@constants/index";

export const Header: React.FC = () => {
  const score = useRecoilValue(scoreState);

  useEffect(() => {
    Object.values(questionCategories).map((q) => console.log(q));
  }, []);

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
          <Box>
            {Object.values(questionCategories).map((q) => {
              <Text>{q}</Text>;
            })}
          </Box>
          <Text fontSize={[2, null, 3]} fontWeight="600">
            {score.score} / {score.outOf}
          </Text>
        </Flex>
      </Contain>
    </Box>
  );
};