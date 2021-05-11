<?php 
require_once '../../../backend/utiles.php';
//request data:
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);
if($request['type']=="getpoll"){
    $id=$request['condition'];
    $poll=[];
    $userz=[];
    $users=[];
    $sql="SELECT name,questions, dateend, dateadd  FROM polls WHERE id=$id";
    $poll=$dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC);
    $poll['questions']=json_decode($poll['questions']);
        $sql1="SELECT * FROM polls_allowed WHERE idpoll = $id";
        foreach($dbSQL->query($sql1)->fetchAll(PDO::FETCH_ASSOC) as $data){
            $idc = $data['iduser'];
            $sql2="SELECT * FROM users WHERE id=$idc";
            $datas=$dbSQL->query($sql2)->fetch(PDO::FETCH_ASSOC);
                $userz['name']=$datas['name'];
                $userz['surname']=$datas['surname'];
                $userz['mail']=$datas['mail'];
                $userz['status']=$data['status'];
                $users[]=$userz;
            }
    $answers=[];
    $sum=0;
    $sql = "SELECT answers FROM polls_answers 
     WHERE idpoll= $id";
    foreach ($dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC) as $p){
        $answers[]=$p;
    }
    $poll['answers']=$answers;
    $poll['users']=$users;
    echo json_encode($poll);
}
if($request['type']=="calculateStats"){
    $ans=[];
    $rest=[];
    $answers=$request['condition']['answers'];
    $questions=$request['condition']['questions'];
    $idpoll=$request['condition']['idpoll'];
    $sql="SELECT COUNT(iduser) FROM polls_allowed WHERE idpoll=$idpoll AND status=2";
    $counter=$dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC)["COUNT(iduser)"];
    foreach($answers as $value){
        $ans[]=json_decode($value['answers'],true);
    }
    foreach ($questions as $key2 => $value2) {
        foreach ($value2['answers'] as $key3 => $value3) {
            foreach ($ans as $key1 => $value1) {
                foreach ($value1['answer'] as $key4 => $value4) {
                    if($value2['type']=='close'){
                        if($key4==$key2 && (int)$value4['val'] == $value3['ord']){
                            $questions[$key2]['answers'][$key3]['vote']+=1;
                            $procentage = $questions[$key2]['answers'][$key3]['vote']/$counter;
                            $procentage=$procentage*100;
                            $questions[$key2]['answers'][$key3]['procentage']=$procentage;
                        }
                    }
                    if($value2['type']=='open'){
                        if($key4==$key2){
                            $questions[$key2]['answers'][$key3]['vote'][]=$value4['val'];
                        }
                    }
                    if($value2['type']=='scale'){
                        if($key4==$key2){
                            $questions[$key2]['answers'][$key3]['vote'][(int)$value4['val']]['number']+=1;
                            $questions[$key2]['answers'][$key3]['vote'][(int)$value4['val']]['val']=(int)$value4['val'];
                            $procentage = $questions[$key2]['answers'][$key3]['vote'][(int)$value4['val']]['number']/$counter;
                            $procentage=$procentage*100;
                            $questions[$key2]['answers'][$key3]['vote'][(int)$value4['val']]['procentage']=$procentage;
                        }
                    }
                }
            }
        }
    }
    //var_dump($questions);die;
    $rest['questions']=$questions;
   echo json_encode($rest);
}
if($request['type']=="checkpoll"){
    $iduser=$request['condition']['iduser'];
    $idpoll=$request['condition']['idpoll'];
    $truepassword=$request['condition']['true'];
    $userData=$iduser.$truepassword;
    $userData=hash('md5',$userData);
    $poll=[];
    $userz=[];
    $data=[];
    $sql="SELECT name,questions, polls_answers.answers as answers FROM polls LEFT JOIN polls_answers ON polls.id = polls_answers.idpoll WHERE polls_answers.user='$userData' AND polls.id = $idpoll";
    $poll=$dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC);
    $data['questions']=json_decode($poll['questions']);
    $data['name']=$poll['name'];
    $data['answers']=json_decode($poll['answers']);
    $data['iduser']=$iduser;
    $data['idpoll']=$idpoll;
    $data['true']=$truepassword;
    echo json_encode($data);

}
if($request['type']=="checkConst"){
    $object=[];
    $user=$request['condition']['user'];
    $chain=$request['condition']['chain'];
    $truepassword=$request['condition']['trues'];
    $answers=$request['condition']['answers'];
    $poll=$request['condition']['poll'];
    $object['answer']=$answers;
    $object['iduser']=$user;
    $object['idpoll']=$poll;
    $object['truepassword']=$truepassword;
    $string=json_encode($object);
    $string=hash('md5',$string);
    if($string==$chain){
        $confirm=1;
    }else{
        $confirm=2;
    }
    // var_dump($string);
    // var_dump($chain);
    // var_dump($confirm);die;
    echo json_encode($confirm);
}
if($request['type']=="getnewraportnumber"){
    $sql = "SELECT COUNT(raports.id) as id FROM raports";
    $raport = ($dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC))['id'];
    if($raport){
        $raport++;
    }else{
        $raport=1;
    }
}
if($request['type']=="searchUsers"){
    $text=$request['condition'];
    $sql = "SELECT users.* FROM users WHERE name LIKE '$text%' OR surname LIKE '$text%' OR mail LIKE '$text%' ORDER BY name ASC";
    $users = [];
    $temp=[];
    foreach($dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC) as $user){
        $temp['id'] = $user['id'];
        $temp['email'] = $user['mail'];
        $temp['name'] = $user['name'];
        $temp['surname'] = $user['surname'];
        $users[]=$temp;
    };  
    echo json_encode($users);
}
if($request['type']=="addNewPoll"){
    $object=$request['condition'];
    $name=$object['name'];
    $creator=$object['creator'].'klucz';
    $creator=hash('md5',$creator);
    $questions=$object['questions'];
    $questions=json_encode($questions,JSON_UNESCAPED_UNICODE);
    $dateend=$object['dateend'];
    $dateadd=$object['dateadd'];
    $allowed=$object['dest'];
    $sql="INSERT INTO polls (name,questions,dateadd,dateend,creator) VALUES ('$name','$questions','$dateadd','$dateend','$creator')";
    $dbSQL->prepare($sql)->execute();
    $sql1="SELECT id FROM polls WHERE creator='$creator' ORDER BY id DESC LIMIT 1 ";
    $id = $dbSQL->query($sql1)->fetch(PDO::FETCH_ASSOC)['id'];
    foreach ($allowed as  $value) {
        $idc=$value['id'];
        $sql="INSERT INTO polls_allowed (status,idpoll,iduser) VALUES (1,'$id','$idc')";
        $dbSQL->prepare($sql)->execute();
    }
    
    $res = array('type' => $request['type'], 'success' => true, 'message' => 'Poszło');
    echo json_encode($res);
  
}
if($request['type']=="AddAnswer"){
    $object=[];
    $object['answer']=$request['condition']['answer'];
    $answers=json_encode($object['answer'],JSON_UNESCAPED_UNICODE);
    $object['iduser']=$request['condition']['id'];
    $object['idpoll']=$request['condition']['idpoll'];
    $dateadd=$request['condition']['currentTime'];
    $object['truepassword']=$request['condition']['true'];
    $userData=$object['iduser'].$object['truepassword'];
    $userData=hash("md5",$userData);
    $idpoll=$object['idpoll'];
    $iduser=$object['iduser'];
    $string=json_encode($object);
    $string=hash('md5',$string);

    $sql="UPDATE polls_allowed SET status=2 WHERE idpoll='$idpoll' AND iduser=$iduser AND status=1";
    $dbSQL->prepare($sql)->execute();
    $sql="INSERT INTO polls_answers (idpoll,user,answers,dateadd) VALUES ($idpoll,'$userData','$answers',$dateadd)";
    $dbSQL->prepare($sql)->execute();

    echo $string;
    
  
}
// if($request['type']=="myCreatedPollsList"){
//     $creator = $request['condition'].'klucz';
//     $creator = hash("md5",$creator);
//     $sql = "SELECT polls.* FROM polls WHERE creator='$creator'";
//     $polls=[];
//     $pollz=[];
//     foreach($dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC) as $poll){ 
//         //$pollz['idpoll']=$poll['id'];
//         $pollz['name']=$poll['name'];
//         $pollz['questions']=$poll['questions'];
//         $pollz['dateadd']=$poll['dateadd'];
//         $pollz['dateend']=$poll['dateend'];
//         $polls[]=$pollz;
//     }
//     echo json_encode($polls);
// }
if($request['type']=="myPollsList"){
    $id = $request['condition'];
    $sql = "SELECT polls.* FROM polls INNER JOIN polls_allowed ON polls_allowed.idpoll=polls.id WHERE polls_allowed.iduser=$id AND status=1 ORDER BY name ASC";
    $polls = $dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC);   
    echo json_encode($polls);
}
if($request['type']=="myFilledList"){
    $id = $request['condition']['id'];
    $truepassword = $request['condition']['true'];
    $userData = $id.$truepassword;
    $userData = hash('md5',$userData);
    $sql = "SELECT polls.*,polls_answers.dateadd as datefill FROM polls LEFT JOIN polls_answers ON polls.id=polls_answers.idpoll INNER JOIN polls_allowed ON polls_allowed.idpoll=polls.id WHERE polls_allowed.iduser=$id AND polls_allowed.status=2 AND polls_answers.user='$userData' ORDER BY name ASC";
    $polls = $dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC);   
    echo json_encode($polls);
}
if($request['type']=="myCreatedPollsList"){
    $creator = $request['condition'].'klucz';
    $creator = hash("md5",$creator);
    $datenow = time();
    $index=0;
    $sql = "SELECT polls.* FROM polls WHERE creator='$creator' ORDER BY name ASC";
    $polls = $dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC);   
    foreach ($polls as $value){
        if($value['dateend']<=$datenow){
            $polls[$index]['status']='Zakończona';
        }else{
            $polls[$index]['status']='Aktywna';
        }
        $index++;
    }
    echo json_encode($polls);
}
if($request['type']=="editraport"){
    $idraport=$request['condition']['id'];
    $nr=$request['condition']['nr'];
    $dateadd=$request['condition']['dateadd'];
    //check for duplicates
    $sql = "SELECT id FROM raports WHERE nr LIKE '$nr'";
    foreach ($dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC) as $value) {
        if ($value&&$value!=$idraport) {
            $res = array('type' => $request['type'], 'success' => false, 'message' => 'Dokument o podanym numerze już istnieje!');
            echo json_encode($res);
            die;
        }
    }
    $sql="UPDATE raports SET nr='$nr',dateadd=$dateadd WHERE id=$idraport";
    $dbSQL->prepare($sql)->execute();
    $res = array('type' => $request['type'], 'success' => true, 'message' => 'Dokument został zmieniony!');
    echo json_encode($res);
}
if($request['type']=="productsList"){
    $products=[];
    $sql = "SELECT *, products.id as idproduct FROM products ORDER BY name ASC";
    $products=$dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
}
if($request['type']=="editraportproducts"){
    $idraport=$request['condition']['id'];
    $products=$request['condition']['products'];
    //check for duplicates
    $sql="DELETE FROM raport_product WHERE raport_product.idraport=$idraport";
    $dbSQL->prepare($sql)->execute();
    foreach($products as $product){
        if(isset($product['idproduct'])&&isset($product['amount'])){
            $idproduct=$product['idproduct'];
            $amount=$product['amount'];
            $price=$product['price'];
            $sql="INSERT INTO raport_product (idraport,idproduct,amount,price) VALUES ($idraport,$idproduct,$amount,$price)";
            $dbSQL->prepare($sql)->execute();
        }
    }
    $res = array('type' => $request['type'], 'success' => true, 'message' => 'Dokument został zmieniony!');
    echo json_encode($res);
}
if($request['type']=="importExcel"){
    $idraport=$request['condition']['idraport'];
    $idfile=$request['condition']['idfile'];
    // var_dump($idraport,$idfile); die;




    $sql = "SELECT files.* FROM files WHERE id='$idfile'";
    $file = $dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC);
    $path='/var/www/biomat/imports/files/'.$file['name'];

    if(!file_exists($path)){
        $res = array('type' => $request['type'], 'success' => false, 'message' => 'Dokument o podanym numerze już istnieje!');
        echo json_encode($res);
        die;
    }
    $handle = fopen($path, "r");
    $i=0;
    while (! feof ($handle)){
        $i++;
        $linewin=fgets($handle);
        $lineutf=iconv("Windows-1250","UTF-8",$linewin);
        $line=explode(',', $lineutf);
        // var_dump($line); die;
        if($i>1){
            $name=str_replace('"', '', $line[1]);
            $code=$line[0];
            $price=(float)$line[7];
            $box=strtoupper($line[4]);
            $storage=$line[18];
            $sql = "SELECT products.* FROM products WHERE products.code= '$code'";
            $product = $dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC);
            if(isset($product['id'])){
                $idproduct=$product['id'];
                $sql="UPDATE products SET box='$box',price=$price, name='$name' WHERE products.id= $idproduct";
                $dbSQL->prepare($sql)->execute();
            }else{
                $sql="INSERT INTO products (name,code,box,price,box_shop,instock,vat) VALUES ('$name','$code','$box',$price,'$box',0,'zw')";
                $dbSQL->prepare($sql)->execute();
                $sql = "SELECT id FROM products ORDER BY id DESC";
                $idproduct = ($dbSQL->query($sql)->fetch(PDO::FETCH_ASSOC))['id'];

            }
            $sum=0;
            $sql = "SELECT * FROM raport_product WHERE idproduct= $idproduct";
            foreach($dbSQL->query($sql)->fetchAll(PDO::FETCH_ASSOC) as $rp){
                $sum+=$rp['amount'];
            }
            $newamount=($sum+$storage)*(-1);
            $sql="INSERT INTO raport_product (idraport,idproduct,amount,price) VALUES ($idraport,$idproduct,$newamount,$price)";
            $dbSQL->prepare($sql)->execute();

        }   
        
    }
    $res = array('type' => $request['type'], 'success' => true, 'message' => 'Zaktualizowano');
    echo json_encode($res);
}
?>