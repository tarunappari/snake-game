import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import snakeImg from "../Assests/snakeImg.jpg";
import {motion} from 'framer-motion'

const LandingPage = () => {
  let navigate = useNavigate();

  return (
    <LandingPageContainer>
      <div className="container">
        <motion.h1 
        style={{width:'100%'}}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}>Snake Game</motion.h1>
        <motion.button 
        style={{width:'100%'}}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }} onClick={() => navigate("/game")}>Start Game</motion.button>
        <motion.div
        style={{width:'100%'}}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }} className="inst">
          <h3>.Instruction</h3>
          <div>
            <p>.click on start button when you land on game</p>
            <p>.press on any arrow key to start the game</p>
            <p>.while eating the food score will be increase</p>
            <p>.if you hit the wall game will be over</p>
            <p>.if you hit yourself game will be over</p>
          </div>
        </motion.div>
      </div>
    </LandingPageContainer>
  );
};

export default LandingPage;

let LandingPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${snakeImg});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  .container {
    position: relative;
    right: 9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 6rem;
    h1 {
      color: black;
      font-size: 5rem;
    }
    h3 {
      font-size: 2rem;
    }
    p {
      font-size: 1.2rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: 1px solid black;
      border-radius: 1rem;
      font-size: 1.5rem;
    }
    .inst{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
  }
`;
