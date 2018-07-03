package com.reddittv;

import android.widget.Toast;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class LaunchYoutube extends ReactContextBaseJavaModule {

  public LaunchYoutube(ReactApplicationContext reactContext) {
    super(reactContext);
  }

    @Override
    public String getName() {
        return "LaunchYoutube";
    }

    @ReactMethod
    public void launch(String id) {
        Intent intent = new Intent(android.content.Intent.ACTION_VIEW, Uri.parse( "vnd.youtube://" + id ));
        intent.putExtra("finish_on_ended", true);
        intent.setFlags(524288);
        getCurrentActivity().startActivity(intent);
  }
}
