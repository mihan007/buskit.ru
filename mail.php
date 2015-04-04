<?php
/**
 * Created by PhpStorm.
 * User: mihan007
 * Date: 04.04.15
 * Time: 12:16
 */
require_once 'vendor/autoload.php';
require_once 'Credentials.php';

ob_start();
var_dump($_REQUEST);
$body1 = ob_get_clean();

ob_start();
var_dump($_SERVER);
$body2 = ob_get_clean();

date_default_timezone_set('Europe/Moscow');
$body0 = date('Y-m-d H:i:s', time());
$body = $body0 . "\n" . $body1 . "\n" . $body2;
file_put_contents("emails.txt", $body . "\n", FILE_APPEND);

$bodyForEmail = $body0 . "\n" . $body1;

// Create the message
$message = Swift_Message::newInstance()
	// Give the message a subject
	->setSubject('Сообщение с сайта')
	// Set the From address with an associative array
	->setFrom(array('site@buskit.ru' => 'Robot of buskit.ru'))
	// Set the To addresses with an associative array
	->setTo(array('hello@buskit.ru', 'mihan007@ya.ru'))
	// Give it a body
	->setBody($bodyForEmail);

// Create the Transport
$transport = Swift_SmtpTransport::newInstance('smtp.yandex.ru', 465, 'ssl')
	->setUsername(Credentials::smtpUsername())
	->setPassword(Credentials::smtpPassword());

// Create the Mailer using your created Transport
$mailer = Swift_Mailer::newInstance($transport);

$mailer->send($message);

echo "All done!";