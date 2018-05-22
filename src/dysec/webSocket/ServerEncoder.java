/**
 * BBD Service Inc
 * All Rights Reserved @2018
 */

package dysec.webSocket;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;
import java.util.Collection;

/**
 * @author Tony
 * @version ServerEncoder.java, v0.1 18-4-28 下午3:18 Tony
 */
public class ServerEncoder implements Encoder.Text<Object> {
    @Override
    public String encode(Object chatRecord) throws EncodeException {
        //将chatRecord转化成json格式
        String result;
        if (chatRecord instanceof Collection) {//如果是集合类型按照数组转化json
            result = JSONArray.fromObject(chatRecord).toString();
        } else {
            result = JSONObject.fromObject(chatRecord).toString();
        }
        Log.info("对象转化json:" + result);
        return result;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
