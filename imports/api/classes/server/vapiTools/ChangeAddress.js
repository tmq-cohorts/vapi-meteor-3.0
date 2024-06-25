import { FuncTemplate } from "./template";
import { Consumer } from "../../../DB";

class CardReplacement extends FuncTemplate {
    constructor(async, server, messages, func, meta) {
        super(async, server, messages, func, meta);
    }

    verifyRequest(address) {
        const data = this.Data;

        if (data) {
            const consumer = new Consumer(data);
            return consumer.processChangeAddress(address);
        }
        return Promise.resolve({ verified: false });
    }

    parseRequest(request) {
        const { address } = request.message.toolCalls[0].function.arguments;

        return this.verifyRequest(address).then(({ verified, result }) => {
            if(verified) {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: request.message.toolCalls[0].id,
                            result: {
                                success: true,
                                data: result
                            }
                        },
                    ],
                }, true);
            } else {
                this.setResponse(200, {
                    results: [
                        {
                            toolCallId: request.message.toolCalls[0].id,
                            result: {
                                success: false,
                                message: "Process failed. Please try again later"
                            },
                        },
                    ],
                });
            }
            return this.checkResponse();
        }).catch((e) => {
            console.log(e);
            this.setResponse(200, {
                results: [
                    {
                        toolCallId: request.message.toolCalls[0].id,
                        result: {
                            success: false,
                            message: "Process failed. Please try again later"
                        },
                    },
                ],
            });
            return this.checkResponse();
        })
    }
}
const card = {
    type: "function",
    messages: [
        {
            type: "request-start",
            content: "Processing request...",
        },
        {
            type: "request-response-delayed",
            content: "Just a second...",
            timingMilliseconds: 2000,
        },
    ],
    function: {
        name: "process_new_address",
        parameters: {
            type: "object",
            properties: {
                address: {
                    type: "string"
                }
            },
        },
        description:
            "Process card replacement and returns possible delivery dates.",
    },
    async: false,
    server: {
        url: "https://kind-intensely-herring.ngrok-free.app/card_replacement",
    },
};
const meta = {
    title: "Process card replacement",
};

export default new CardReplacement(card.async, card.server, card.messages, card.function, meta);