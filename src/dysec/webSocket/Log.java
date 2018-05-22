/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.webSocket;

import org.apache.log4j.Logger;

/**
 * @author Tony
 * @version Log.java, v0.1 18-4-28 下午3:17 Tony
 */
public class Log {
    private static Logger log = Logger.getLogger(Log.class);
    public static void info(String content){
        log.info(content);
    }
}
