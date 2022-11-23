import { Button, Modal, Spin } from "antd";
import styled, { css } from "styled-components";

interface ModalProps {
  $isDisabledOk: boolean;
}

export const StyledBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .ant-table-wrapper {
    margin-right: 50px;
    margin-left: 50px;

    span {
      cursor: pointer;
    }
  }
`;

export const StyledButton = styled(Button)`
  width: 150px;
  align-self: center;
  margin-bottom: 15px;
  margin-top: 50px;
`;

export const StyledSpin = styled(Spin)`
  margin-left: 50%;
`;

export const StyledModal = styled(Modal)<ModalProps>`
  .ant-btn-primary {
    ${({ $isDisabledOk }) =>
      $isDisabledOk &&
      css`
        pointer-events: none;
        opacity: 0.4;
      `}
  }
`;
