//すべての問題を記録している箇所がないから!
//更にいうと、順番の解いているとも限らないから、理想なのは、最後に解いた問題をテキストに記録してしまうこと！あとはそれを読み込めば良いのだ！


//ドラッグアンドドロップを実装する関数
//htmlの方に記述する事にした
//参照先：http://bashalog.c-brains.jp/20/03/30-170110.php
//進捗をグラフに反映する関数、数値処理ごとに実行する
function progress_bar(){
    // プログレスバーの進捗値を更新し、プログレスバーに反映させる
    //val(%)の計算を行う
    var bunbo=document.getElementById("target_amount").value
    var bunshi=document.getElementById("count").value
    var val=bunshi/bunbo*100

    document.getElementById("myProgress").value = val;
    //document.getElementById("myProgress").innerText = val + "%";
}




//達成問題数をカウントしてくれる関数
function count(){

  var today_done=document.getElementById("output3").value

  //何も記入されていない場合も、空白をカウントしている模様
  if (today_done==""){
    var count=0;
  }else{
  //ここから、,を抜いてカウントする
  var today_split=today_done.split(',')
  //数を数える
  var count=today_split.length
  }
  //反映
  document.getElementById("count").value=count
}



//今日の達成数のリセット
function today_count_reset(){
  document.getElementById("output3").value=""
  count()
  progress_bar()
}




//出力する関数
function output(){
  //値をフォームから取得
  const t1 = document.form1.text1.value;
  var text = t1;
  var blob = new Blob([text], {type: "text/plain"}); // バイナリデータを作ります。
  //参照先：https://blog.fagai.net/2014/08/09/javascript-only-save/
  // IEか他ブラウザかの判定
  if(window.navigator.msSaveBlob)
  {
      // IEなら独自関数を使います。
      window.navigator.msSaveBlob(blob, "ファイル名.txt");
  } else {
      // それ以外はaタグを利用してイベントを発火させます
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.target = '_blank';

      var subject_name=document.getElementById("output1").value

      a.download = subject_name+'.txt';
      a.click();
      //参照先：https://javascript.keicode.com/newjs/download-files.php#2
      //おそらく負荷を抑えるためにクリアしている
      a.remove();
      URL.revokeObjectURL(url);
    }
}

//現状の保存関数：文章を作成し、フォームに出力→保存する関数に引き継ぐ
//一番最後の行に、pre_numberを追加した！
function save_now(){
  var new_save=document.getElementById("output1").value+"\n"+document.getElementById("output2").value+"\n"+document.getElementById("output3").value+"\n"+document.getElementById("output4").value+"\n"+document.getElementById("output5").value+"\n"+document.getElementById("output6").value+"\n"+document.getElementById("output7").value+"\n"+document.getElementById("pre_number").value;
  document.form1.text1.value=new_save;
  output();
}





//候補を更新する為の関数
function spare_change(){
    //現在の番号を取得する
     var now=document.getElementById("output2").value
     document.getElementById("spare1").value=Number(now)+1;
     document.getElementById("spare2").value=Number(now)+2;
     document.getElementById("spare3").value=Number(now)+3;
}

//参照先：http://nanoappli.com/blog/archives/655
//実験成功
function splitByLine() {
    var text  = document.form1.text1.value;

    text.replace(/\r\n|\r/g, "\n");
    var lines = text.split( '\n' );
    var outArray = new Array();

    for ( var i = 0; i < lines.length; i++ ) {
        // 空行は無視する
        if ( lines[i] == '' ) {
            continue;
        }

        outArray.push( lines[i] );
    }
    document.getElementById("output1").value=lines[0];
    document.getElementById("output2").value=lines[1];
    document.getElementById("output3").value=lines[2];
    document.getElementById("output4").value=lines[3];
    document.getElementById("output5").value=lines[4];
    document.getElementById("output6").value=lines[5];
    document.getElementById("output7").value=lines[6];
    document.getElementById("pre_number").value=lines[7];

    count()
    progress_bar()
    //なぜか、ここのspare_changeが反映されない！
    spare_change()
}

//候補の番号をクリック→現在の問題番号を更新する関数
function new_number_set1(){
  document.getElementById("output2").value=document.getElementById("spare1").value;
}

function new_number_set2(){
  document.getElementById("output2").value=document.getElementById("spare2").value;
}

function new_number_set3(){
  document.getElementById("output2").value=document.getElementById("spare3").value;
}


//現在の問題についてのレスポンスに対応する関数
function maru(){
  //現在の番号を取得
  var now=document.getElementById("output2").value;

  //空白の入力が起きた場合、リアクションが起きないようにする
  if(now==""){
    alert('空欄です！');

  }else{
    //問題番号候補の更新
     spare_change()
  //取得したら、空欄にする
  document.getElementById("output2").value="";
  //さっき解いた問題番号の箇所に反映させる
  document.getElementById("pre_number").value=now;

  //今日解いた問題、○を更新
  var today=document.getElementById("output3").value;
  if (today==""){
      var new_today=now;
  }else{
      var new_today=today+","+now;
  }
  document.getElementById("output3").value=new_today;

  var maru=document.getElementById("output4").value;
  if (maru==""){
      var new_maru=now;
  }else{
      var new_maru=maru+","+now;
  }
  document.getElementById("output4").value=new_maru;

  count()
  progress_bar()
}
}

function sankaku(){
   var now=document.getElementById("output2").value;
   //空白の入力が起きた場合、リアクションが起きないようにする
   if(now==""){
     alert('空欄です！');
   }else{
     //問題番号候補の更新
      spare_change()
   //取得したら、空欄にする
   document.getElementById("output2").value="";
   //さっき解いた問題番号の箇所に反映させる
   document.getElementById("pre_number").value=now;
   //今日解いた問題、○を更新
   var today=document.getElementById("output3").value;
   if (today==""){
       var new_today=now;
   }else{
       var new_today=today+","+now;
   }
   document.getElementById("output3").value=new_today;

   var sankaku=document.getElementById("output5").value;
   if (sankaku==""){
       var new_sankaku=now;
   }else{
       var new_sankaku=sankaku+","+now;
   }
   document.getElementById("output5").value=new_sankaku;

   count()
   progress_bar()
 }
}

function batu(){
   var now=document.getElementById("output2").value;
   //空白の入力が起きた場合、リアクションが起きないようにする
   if(now==""){
     alert('空欄です！');
   }else{
     //問題番号候補の更新
      spare_change()
   //取得したら、空欄にする
   document.getElementById("output2").value="";
   //さっき解いた問題番号の箇所に反映させる
   document.getElementById("pre_number").value=now;
   //今日解いた問題、○を更新
   var today=document.getElementById("output3").value;
   if (today==""){
       var new_today=now;
   }else{
       var new_today=today+","+now;
   }
   document.getElementById("output3").value=new_today;

   var batu=document.getElementById("output6").value;
   if (batu==""){
       var new_batu=now;
   }else{
       var new_batu=batu+","+now;
   }
   document.getElementById("output6").value=new_batu;

   count()
   progress_bar()
 }
}

function hatena(){
   var now=document.getElementById("output2").value;
   //空白の入力が起きた場合、リアクションが起きないようにする
   if(now==""){
     alert('空欄です！');
   }else{
     //問題番号候補の更新
      spare_change()
   //取得したら、空欄にする
   document.getElementById("output2").value="";
   //さっき解いた問題番号の箇所に反映させる
   document.getElementById("pre_number").value=now;
   //今日解いた問題は更新しない！、？のみを更新

   var hatena=document.getElementById("output7").value;
   if (hatena==""){
       var new_hatena=now;
   }else{
       var new_hatena=hatena+","+now;
   }
   document.getElementById("output7").value=new_hatena;

   count()
   progress_bar()
 }
}
