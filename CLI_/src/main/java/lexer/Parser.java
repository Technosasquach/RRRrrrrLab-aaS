package lexer;

import python.*;
import java.io.*;

public class Parser {
    private static StringBuilder sb;

//    private static boolean checkCall(Token token) throws Exception {
//        if (Constants.FUNC_CALL.contains(token.getString())) {
//            sb.append("func");
//            py.callFunction(sb.toString());
//            sb.setLength(0);
//            return true;
//        }
//    }

    public static void main(String[] args) throws Exception {
        Constants.init();
        String processid = args[0];
        String file = args[1];
        String script = args[2];
        Lexer lexer = new Lexer(new FileReader(file));

        Python py = new Python(script);

        sb = new StringBuilder();
        for (;;) {
            Token token = lexer.nextToken();

            // Within here handle the python files
            if (token.getType() == Token.Type.EOF) {

                // TODO Handle the break
                break;
            } else if (Constants.FUNC_CALL.contains(token.getString())) {
                sb.append("func");
                py.callFunction(sb.toString());
                sb.setLength(0);

            } else {
                sb.append(token.getString());
                sb.append("_");
            }
        }

        py.run();
    }
}
