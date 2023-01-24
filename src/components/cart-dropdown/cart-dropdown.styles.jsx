import styled from 'styled-components';

import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
} from '../button/button.styles';

export const CartDropdownContainer = styled.div`
    --ratio: 1.6;

    width: 240px;
    height: calc( 240px * var(--ratio));
    padding: 20px;
    border: 0.5px solid black;
    background-color: snow;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100px;
    right: 40px;
    z-index: 5;

    ${BaseButton},
    ${GoogleSignInButton},
    ${InvertedButton} {
        margin-top: auto;
        font-size: 90%;
    }
`

export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`

export const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    // overflow: scroll;
    overflow-y: scroll;
`

