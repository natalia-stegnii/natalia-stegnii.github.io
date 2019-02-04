<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */

//dpm($row, '$row');
////$email = $row->users_mail;
//$output = $row->node_users_nid;
//$count_request = j_crm_request_get_count($uid);
$class = '';
$uid = isset($row->uid) && is_numeric($row->uid) ? $row->uid : NULL;
if ($output && $uid) {
  $output = l($output, 'j-crm/block_request/' . $uid . '/nojs', array(
    'attributes' => array(
      'class' => array('use-ajax modal-block'),
      'title' => t('Other user requests'),
    )
  ));
}
else {
  $class = ' empty';
}
$link = $uid ? 'flex/nojs/modal/form/request_node_form/-/set_client/' . $uid : 'flex/nojs/modal/form/request_node_form';
$output .= l('+', $link, array(
  'attributes' => array(
    'class' => array('ctools-use-modal btn small simple ctools-modal-ctools-flex-style'),
    'title' => t('Create request'),
  )
));
?>
<div class="feedbacks<?php print $class; ?>"><?php print $output; ?></div>
