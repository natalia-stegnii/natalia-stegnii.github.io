<?php
/**
 * @file comment-reply-wrapper.tpl.php
 * @see comment_reply()
 * Main view template.
 *
 * INSTRUCTION:
 * PATCH the function comment_reply() adding link:
 *  $build['#theme'][] = 'comment_reply_wrapper';
 *  Creating theme "comment_reply_wrapper"
 * function MYTHEME_theme($existing, $type, $theme, $path) {
 *   return array(
 *     'comment_reply_wrapper' => array(
 *       'render element' => 'content',
 *       'template' => 'comment-reply-wrapper',
 *       'path' => $path . '/templates',
 *     ),
 *   );
 * }
 *
 * Variables:
 * $content['comment_parent'] -- comments
 * $content['comment_parent']['comment_body'] -- comments body
 * $content['comment_parent']['links'] -- comments links
 * $content['comment_parent']['#comment'] -- ?
 *
 * $content['comment_form'] -- comment form
 * $content['comment_form']['subject'] --
 * $content['comment_form']['author'] --
 * $content['comment_form']['author']['name'] --
 * $content['comment_form']['author']['mail'] --
 * $content['comment_form']['author']['homepage'] --
 * $content['comment_form']['author']['date'] --
 * $content['comment_form']['author']['status'] --
 *
 * $content['comment_form']['is_anonymous'] --
 * $content['comment_form']['comment_body'] --
 *
 * $content['comment_form']['actions'] --
 * $content['comment_form']['actions']['submit'] --
 * $content['comment_form']['actions']['preview'] --
 *
 * $content['comment_form']['uid']
 */

//hide($content['comment_form']['author']['name']);
//dpm($content, '$content');
?>

<div class="comments wide reply bg-color white shadow ph30 pv20">
  <h3><?php print t('Reply to comment'); ?></h3>
  <?php print render($content['comment_parent']); ?>
  <?php print render($content['comment_form']); ?>
</div>

<?php print drupal_render_children($content);//do not remove this code to ubercart's checkout continues to work ?>
