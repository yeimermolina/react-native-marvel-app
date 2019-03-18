package com.findplaces;

import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;
 
public class MainActivity extends NavigationActivity {
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(this.createSplashLayout());
    }
 
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);
 
        view.setBackgroundColor(Color.parseColor("#521751"));
        view.setGravity(Gravity.CENTER);
        
        textView.setTextColor(Color.parseColor("#fa923f"));
        textView.setText("Awesome Places");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);
 
        view.addView(textView);
 
        return view;
    }
 
}