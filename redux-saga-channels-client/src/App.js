import { useSelector, useDispatch } from "react-redux";
import { clearLogs, generateLog } from "./loggerSlice";
import Clock from "./Clock";

const App = () => {
    const logs = useSelector((state) => state.logger.logs);
    const messages = useSelector((state) => state.logger.messages);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Redux Saga - ActionChannel</h2>
            <button
                onClick={() =>
                    dispatch(
                        generateLog({ clickDate: new Date().toLocaleString() })
                    )
                }
            >
                GENERATE LOG
            </button>
            <button onClick={() => dispatch(clearLogs())}>CLEAR LOG</button>

            <Clock />
            <div>
                <h4>Logs:</h4>
                {logs.map((log) => (
                    <blockquote>{log.clickDate}</blockquote>
                ))}
            </div>
            <hr />
            <h2>Redux Saga - EventChannel</h2>
            <div>
                <h4>Messages:</h4>
                {messages.map((msg) => (
                    <blockquote>{msg}</blockquote>
                ))}
            </div>
        </div>
    );
};

export default App;
