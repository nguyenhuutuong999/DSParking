
import styled, { css } from 'styled-components';

export const Section = styled.div`

  background: #fff;
  width: 45%;
  height: 200px;
  margin: 10px;

`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
 width:100%;
 height: 75vh;
 overflow-y: scroll;
`;

export const Header = styled.div `
  height: 20%;
  width: 100%;
  background:red;
`
export const Body = styled.div `
  height: 80%;
  width: 100%;
  background:blue;
  flex-wrap: wrap;
  display: flex;
`

export const ImagePark = styled.div `
  height: 100%;
  width: 20%;
  background:#139FF9;
`
export const Park = styled.div `
  height: 100%;
  width: 80%;
  background:pink;
  
  padding: 2%;
`


export const DotLine = styled.div `
  flex-wrap: wrap;
  display: flex;
  background: orange;
  
`
export const Parked = styled.div `
height: 15px;
width: 15px;
background: yellow;
border-radius : 5px;
margin: 0.9%;
`
export const Empty = styled.div `
height: 15px;
width: 15px;
background: black;
border-radius : 5px;
margin: 0.9%;
  
`