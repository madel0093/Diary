package com.Diary;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.channels.FileChannel;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.os.Environment;

public class SDCardPlugin extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		android.util.Log.w("diary", "Enter Class SDCardPlugin");
		if (action.equals("backup") || action.equals("restore")) {
			try {
				File sd = Environment.getExternalStorageDirectory();
				File data = Environment.getDataDirectory();

				if (sd.canWrite()) {
					String currentDBPath = "//data//com.Diary//databases//wljsonstore//jsonstore.sqlite";
					String backupDBPath = "diaryDB.sqlite";
					File currentDB = null;
					File backupDB = null;

					if(action.equals("backup")){
						android.util.Log.w("diary", "Backup Action");
						currentDB = new File(data, currentDBPath);
						backupDB = new File(sd, backupDBPath);
					}else if(action.equals("restore")){
						android.util.Log.w("diary", "Restore Action");
						currentDB = new File(sd, backupDBPath);
						backupDB = new File(data, currentDBPath);
					}
					
					if (currentDB != null && currentDB.exists()) {
						android.util.Log.w("diary", "Transfering DB ...");
						FileChannel src = new FileInputStream(currentDB).getChannel();
						FileChannel dst = new FileOutputStream(backupDB).getChannel();
						dst.transferFrom(src, 0, src.size());
						src.close();
						dst.close();
						callbackContext.success("YES");
					} else {
						callbackContext.error("MAYBE");
					}
				}
			} catch (Exception e) {
				callbackContext.error("Failed " + e.getMessage());
			}
			return true;
		}
		return false;
	}
}
