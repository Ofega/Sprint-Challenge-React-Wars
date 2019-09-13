import React from "react";
import styled from 'styled-components'


const LoadingIndicator = () => {
    return (
        <Loader>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Loader>
    )
}

export default LoadingIndicator;

const Loader = styled.div`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div {
        position: relative;
        width: 100px !important;
        height: 100px !important;
        -webkit-transform: translate(-50px, -50px) scale(0.5) translate(50px, 50px);
        transform: translate(-50px, -50px) scale(0.5) translate(50px, 50px);

        @keyframes lds-spinner {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    
        @-webkit-keyframes lds-spinner {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        div {
            left: 94px;
            top: 45px;
            position: absolute;
            -webkit-animation: lds-spinner linear 1.6s infinite;
            animation: lds-spinner linear 1.6s infinite;
            background: #fff;
            width: 12px;
            height: 30px;
            border-radius: 40%;
            -webkit-transform-origin: 6px 55px;
            transform-origin: 6px 55px;

            &::nth-child(1) {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
                -webkit-animation-delay: -1.44s;
                animation-delay: -1.44s;
            }

            &:nth-child(2) {
                -webkit-transform: rotate(36deg);
                transform: rotate(36deg);
                -webkit-animation-delay: -1.28s;
                animation-delay: -1.28s;
            }

            &:nth-child(3) {
                -webkit-transform: rotate(72deg);
                transform: rotate(72deg);
                -webkit-animation-delay: -1.12s;
                animation-delay: -1.12s;
            }

            &:nth-child(4) {
                -webkit-transform: rotate(108deg);
                transform: rotate(108deg);
                -webkit-animation-delay: -0.96s;
                animation-delay: -0.96s;
            }

            &:nth-child(5) {
                -webkit-transform: rotate(144deg);
                transform: rotate(144deg);
                -webkit-animation-delay: -0.8s;
                animation-delay: -0.8s;
            }

            &:nth-child(6) {
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
                -webkit-animation-delay: -0.64s;
                animation-delay: -0.64s;
            }

            &:nth-child(7) {
                -webkit-transform: rotate(216deg);
                transform: rotate(216deg);
                -webkit-animation-delay: -0.48s;
                animation-delay: -0.48s;
            }

            &:nth-child(8) {
                -webkit-transform: rotate(252deg);
                transform: rotate(252deg);
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }

            &:nth-child(9) {
                -webkit-transform: rotate(288deg);
                transform: rotate(288deg);
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }

            &:nth-child(10) {
                -webkit-transform: rotate(324deg);
                transform: rotate(324deg);
                -webkit-animation-delay: 0s;
                animation-delay: 0s;
            }
        }
    }
`