import { useHref } from "react-router-dom";
import styled from "styled-components";

export default function Button({ content, ruta }) {

  return <StyledButton href={ruta}> {content} </StyledButton>;
}

const StyledButton = styled.a`
  display: flex;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  text-align: center;
  align-items: center;
  justify-content: center;

`;