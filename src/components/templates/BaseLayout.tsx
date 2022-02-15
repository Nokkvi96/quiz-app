import { Box, Contain, Flex } from "@components/system";
import { Header, Footer } from "@components/organisms";

export const BaseLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />
      <Box as="main" flex={"1 0 auto"} display="block" my={[8, null, 10]}>
        <Contain>{children}</Contain>
      </Box>
      <Footer />
    </Flex>
  );
};
