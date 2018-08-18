package lexer;

import java.util.*;

public class Constants {
    public static Set<String> FUNC_CALL = new HashSet<>();
    public static Set<String> FUNC_VAR = new HashSet<>();

    public static void init() {
        FUNC_CALL.add("argh");
        FUNC_CALL.add("arrgh");
        FUNC_CALL.add("r");
        FUNC_CALL.add("yar");
        FUNC_CALL.add("m'hartys");

        FUNC_VAR.add("with");
    }
}
