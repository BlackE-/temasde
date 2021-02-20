<?php
    /*
        
    */
    
    const SUCCESS_CODE = 200;
    const SUCCESS_MESSAGE = 'Sortly we will contact you.';
    const ERROR_CODE = 400;
    const ERROR_MESSAGE = 'Please fill all fields';     
    
    // Import PHPMailer classes into the global namespace
    // These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';
    
    
    $host = isset($_SERVER['HTTP_X_FORWARDED_HOST'])  ? $_SERVER['HTTP_X_FORWARDED_HOST']  : $_SERVER['HTTP_HOST'];
    header('Content-Type: application/json');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin');
    header('AMP-Access-Control-Allow-Source-Origin: https://' . $host);
    
    if (!isset($_POST['name']) || empty($_POST['name'])) {
      $error = ['message' => ERROR_MESSAGE];
      $json = json_encode($error);
      http_response_code(ERROR_CODE);
      die($json);
    }
    if (!isset($_POST['phone']) || empty($_POST['phone'])) {
      $error = ['message' => ERROR_MESSAGE];
      $json = json_encode($error);
      http_response_code(ERROR_CODE);
      die($json);
    }
    if (!isset($_POST['email']) || empty($_POST['email'])) {
      $error = ['message' => ERROR_MESSAGE];
      $json = json_encode($error);
      http_response_code(ERROR_CODE);
      die($json);
    }
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $mensaje = $_POST['mensaje'];
    
    $subject = 'Información de contacto - sense-path.com ENG';
    $msg = '<html>
                <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <title>Información en formulario de contacto - sense-path.com</title>
                </head>
                <body>
                
                    <div style="border:1px solid #005cf5;padding:20px;max-width:360px;margin:0 auto;">
                        <p>Información en formulario de contacto</p>
                        <p>sense-path.com</p>
                        <table>
                            <tr>
                              <td colspan="2"><p></p></td>
                            </tr>
                            <tr>
                              <td>Nombre:</td><td><p><b>'.$name.'</b></p></td>
                            </tr>
                            <tr>
                              <td>Correo Electrónico:</td><td><p><b>'.$email.'</b></p></td>
                            </tr>
                            <tr>
                              <td>Teléfono:</td><td><p><b>'.$phone.'</b></p></td>
                            </tr>
                            <tr>
                              <td>Mensaje:</td><td><p><i>'.$mensaje.'</i></p></td>
                            </tr>
                        </table>
                    </div>
                </body>
            </html>';
    
    
    // Mail it
    //Server settings
    $envio = new PHPMailer(true);
    $envio->CharSet = 'UTF-8';
    $envio->Host       = 'mail.sense-path.com'; // Set the SMTP server to send through
	$envio->SMTPAuth   = true;                                   // Enable SMTP authentication
	$envio->SMTPDebug  = 3;
	$envio->Username   = 'noreplay@sense-path.com';                     // SMTP username
	$envio->Password   = '@bE6.(3Rj]vS';                               // SMTP password
	$envio->Port = 587;
	
	$envio->setFrom('noreplay@sense-path.com', 'noreplay');
    $envio->addAddress('info@sense-path.com');               // Name is optional
    //$envio->addCC('elizabeth@studio-sub.com');
    $envio->addCC('patyfuentes1@live.com');

    // Content
    $envio->isHTML(true);                                  // Set email format to HTML
    $envio->Subject = $subject;
    $envio->Body    = $msg;
		  
		 
        //$headers[] = 'MIME-Version: 1.0';
        //$headers[] = 'Content-type: text/html; charset=iso-8859-1';
        //$headers[] = 'From:noreplay@sense-path.com';
        //mail('elizabeth@studio-sub.com', $subject, $msg, implode("\r\n", $headers));   
	
    if($envio->send()){
        
        $success = ['message' => SUCCESS_MESSAGE];
        $json = json_encode($success);
        http_response_code(SUCCESS_CODE);
        die($json);
    } else {
        $error = ['message' => ERROR_CODE];
        $json = json_encode($error);
        http_response_code($envio->ErrorInfo);
        die($json);
    }
?>