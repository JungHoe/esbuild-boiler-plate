import React, { useEffect } from "react";
import Styled from "styled-components";

const Container = Styled.div`
  background:pink;
`;
type AppProps = {
  name: string;
};
function App({ name }: AppProps) {
  useEffect(() => {
    console.log('functoinCalled#####')

  }, [])
  return <Container>안녕하세요 {name}</Container>;
}

App.propTypes = {};

export default App;
