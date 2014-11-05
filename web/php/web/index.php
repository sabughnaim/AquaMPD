<?php

require('../vendor/autoload.php');
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Our web handlers

$app->get('/', function() use($app) {
  $app['monolog']->addDebug('logging output.');
  return 'Running';
});

$app->post('/send-message', function(Request $request) {
	$message = $request->get('message');
	$number = $request->get('number');
	require('../web/class.googlevoice.php');
	$gv = new GoogleVoice("aquashhnote@gmail.com", "noteAqua");
	$gv->sms($number, $message);
	return new Response('Post',201);
});

$app->get('/send-message', function() use($app) {
  $app['monolog']->addDebug('logging output.');
  return 'get';
});

$app->run();

?>
