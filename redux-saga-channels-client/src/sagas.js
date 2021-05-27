import { take, actionChannel, call, put, delay, all } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import { pushNewLog, generateLog, pushNewMsg } from "./loggerSlice";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

//****************************************************************** */

function* watchRequests() {
    // 1- Create a channel for request actions
    const requestChan = yield actionChannel(generateLog.toString());
    while (true) {
        // 2- take from the channel
        const { payload } = yield take(requestChan);
        // 3- Note that we're using a blocking call
        yield call(handleRequest, payload);
    }
}

function* handleRequest(payload) {
    yield delay(3000);
    yield put(pushNewLog({ clickDate: payload.clickDate }));
}

//****************************************************************** */

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel((emit) => {
        const pingHandler = (event) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            if (event.message === "end") {
                emit(END);
            } else emit(event.message);
        };

        // setup the subscription
        socket.on("announcements", pingHandler);

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.off("announcements", pingHandler);
        };

        return unsubscribe;
    });
}

function* watchEvents() {
    const socket = socketIOClient(ENDPOINT);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
        try {
            // An error from socketChannel will cause the saga jump to the catch block
            const payload = yield take(socketChannel);
            console.log("event payload", payload);
            yield put(pushNewMsg(payload));
        } catch (err) {
            console.error("socket error:", err);
            // socketChannel is still open in catch block
            // if we want end the socketChannel, we need close it explicitly
            // socketChannel.close()
        }
    }
}

//****************************************************************** */

export default function* rootSaga() {
    yield all([watchRequests(), watchEvents()]);
}
