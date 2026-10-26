// 애플 캘린더 → 학사일정 사이트 중계 스크립트 (Google Apps Script)
// iCloud 공개 캘린더는 브라우저에서 직접 읽을 수 없어서(CORS), 이 스크립트가 대신 받아서 전달해요.

// 공유할 캘린더들의 공개 링크를 한 줄에 하나씩 붙여넣으세요 (webcal://... 그대로 붙여도 돼요)
// 여기 적은 순서대로 사이트의 과목 필터에 나와요
const ICS_URLS = [
  'webcal://영어-링크',
  'webcal://국어-링크',
];

function doGet() {
  const requests = ICS_URLS.map(url => ({ url: url.replace(/^webcal:/, 'https:'), muteHttpExceptions: true }));
  // 링크 하나가 잘못돼도 나머지 캘린더는 보이도록, 성공한 것만 이어붙여요
  const text = UrlFetchApp.fetchAll(requests)
    .filter(res => res.getResponseCode() === 200)
    .map(res => res.getContentText())
    .join('\r\n');
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);
}
