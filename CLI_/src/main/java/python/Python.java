package python;

import java.io.*;

public class Python {
    private String script;
    private FileWriter output;

    public Python(String script) throws IOException {
        this.script = script;
        output = new FileWriter(script);
        output.write("" +
                "def hello_world():\n" +
                "\tprint('Hello, World!')\n");
    }

    public int run() throws Exception {
        output.close();
        ProcessBuilder p = new ProcessBuilder("python", script).inheritIO();
        return p.start().waitFor();
    }

    public void callFunction(String func) throws IOException {
        output.write(func + "()\n");
    }
}
