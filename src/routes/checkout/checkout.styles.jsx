import styled from 'styled-components';


export const CheckoutContainer = styled.div`
    width: 64%;
    min-height: 90vh;
    // background-color: lightskyblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto 0;
    outline: 0.5px solid orange;

    .header-container {
        width: 100%;
        height: 100%;
        padding: 0.5rem 0;
        background-color: yellow;
    }

    h1 {
        font-size: 45px;
        text-align: start;
        
        margin-left: 1.25rem;
    }

    .checkout-header {
        width: 100%;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        padding: 1rem 2rem;
        border-bottom: 1px solid darkgray;
        // background-color: yellow;
        outline: 1px solid blue;
        font-size: 20px;
        font-weight: bold;
    }

    .header-block {
        text-transform: capitalize;
        width: 23%;

        &:last-child {
            width: 8%;
        }
    }
`

export const TotalContainer = styled.span`
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;
`