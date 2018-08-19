package python;

import java.io.*;
import java.util.*;

public class Python {
    private String script;
    private FileWriter output;

    public static class Param {
        public Param() {}
        public String name;
        public double value;
    }

    public Python(String script, String process) throws IOException {
        this.script = script;
        output = new FileWriter(script);
        output.write("from assets.lib import *\n");
        output.write("set_process(" + process + ")\n");
    }

    public int run() throws Exception {
        output.close();
        ProcessBuilder p = new ProcessBuilder("python", script).inheritIO();
        System.out.println("Directory: " + p.directory());
        Map<String, String> env = p.environment();
        for (Map.Entry<String, String> entry : env.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        return p.start().waitFor();
    }

    public void callFunction(String func, List<Param> params) throws IOException {
        output.write(func + "(");
        boolean first = true;
        for (Param p : params) {
            if (first) {
                first = false;
            } else {
                output.write(",");
            }
            output.write(p.name + "=" + p.value);
        }
        output.write(")\n");
    }
}
