// 애플 캘린더 → 학사일정 사이트 중계 스크립트 (Google Apps Script)
// iCloud 공개 캘린더는 브라우저에서 직접 읽을 수 없어서(CORS), 이 스크립트가 대신 받아서 전달해요.

// iCloud에서 복사한 공개 캘린더 링크를 붙여넣으세요 (webcal://... 그대로 붙여도 돼요)
const ICS_URL = 'webcal://여기에-링크를-붙여넣으세요';

function doGet() {
  const url = ICS_URL.replace(/^webcal:/, 'https:');
  const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) {
    return ContentService.createTextOutput('ERROR ' + res.getResponseCode());
  }
  return ContentService.createTextOutput(res.getContentText())
    .setMimeType(ContentService.MimeType.TEXT);
}
