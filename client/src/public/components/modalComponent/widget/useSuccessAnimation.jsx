import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import DoneIcon from '@mui/icons-material/Done';

const appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const rippleOut = keyframes`
  20% {
    opacity: 0.5;
  }
  100% {
    top: -15px;
    right: -15px;
    bottom: -15px;
    left: -15px;
    opacity: 0;
  }
`;

const pop = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height : 100%;
  position: relative;
  padding-bottom: 48px;
  margin: 1.5rem 0 60px 0;
`;

const Circle = styled.div`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  border: 3px solid ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  position: relative;
  opacity: 0;
  animation-name: ${appear};
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.65, 0.05, 0.08, 0.99);
  animation-iteration-count: 1;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
  transform: perspective(1px) translateZ(0);

  &:before {
    content: '';
    position: absolute;
    border: ${({ color }) => color} solid 7px;
    border-radius: 50%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    animation-duration: 1s;
    animation-name: ${rippleOut};
    animation-iteration-count: 1;
    animation-delay: 0.4s;
  }
`;

const Tick = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation-name: ${pop};
  animation-duration: 300ms;
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
  animation-delay: 0.8s;
  animation-fill-mode: forwards;
`;

const Message = styled.div`
  color: ${({ color }) => color};
  font-family: 'Rubik', Arial;
  font-size: 28px;
  bottom: 0;
  opacity: 0;
  margin-top:10px;
  animation-name: message-in;
  animation-duration: 1.4s;
  animation-timing-function: cubic-bezier(0, 0.7, 0.31, 1);
  animation-iteration-count: 1;
  animation-delay: 0.8s;
  animation-fill-mode: forwards;

  @keyframes message-in {
    0% {
      opacity: 0;
      transform: translate3d(0, 40%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const SuccessAnimation = ({ color = '#000000', text = 'Success', liveRegion = '' }) => {
  useEffect(() => {
    if (liveRegion) {
      const liveRegionElement = document.getElementById(liveRegion);
      if (liveRegionElement) {
        liveRegionElement.innerHTML = text;
      }
    }
  }, [liveRegion, text]);

  return (
    <Container>
      <Circle className="ripple-out" color={color}>
        <Tick className="pop" color={color}>
          <DoneIcon style={{ color }} sx={{fontSize:120}}/>
        </Tick>
      </Circle>
      {text && <Message className="message" color={color}>{text}</Message>}
    </Container>
  );
};

SuccessAnimation.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  liveRegion: PropTypes.string,
};

export default SuccessAnimation;
