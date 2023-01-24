import styled from 'styled-components';


export const ProductCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;
    background-color: linen;

    img {
        width: 100%;
        height: 92%;                    // <-- troubleshoot ?
        object-fit: cover;
        margin-bottom: 5px;
    }

    button {
        width: 80%;
        opacity: 70%;
        position: absolute;
        top: 255px;
        display: none;
    }

    &:hover {
        img {
            opacity: 80%;
        }

        button {
            opacity: 85%;
            display: flex;
        }
    }

    .footer {
        width: 100%;
        height: 5%;
        display: flex;
        justify-content: space-around;
        font-size: 18px;

        .name {
            width: 90%;
            margin-bottom: 15px;
        }

        .price {
            width: 10%;
        }
    }
`

