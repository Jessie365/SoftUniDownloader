let options = {
  host: 'softuni.bg',
  port: 443,
  path: '',
  method: 'GET',
  headers: {
    'Accept' : 'text/html',
    //'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language' : 'en-US,en;q=0.8,bg;q=0.6',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    'Cookie': 'cb-enabled=accepted; _ym_uid=1488998312139022690; ASP.NET_SessionId=3psv33bwnwibvbseiumju10s; _gat=1; _ym_isad=1; .auth.softuni=Q4QgUWEqOycyQ7Eh3M8O4gAbKmxUUbRsWA1-rOSb8aRE0sH6t-yzZvc56j3thE0bA4zKoa6sxcuJm8ZuuWLWBGQGpKI5A0xfhIBZ44liAChAVVezpyiwdkDk7_2dLohac-7Hq5dKklUNSB7gMJMrjmgiWxkpXWAxvtBvrPiWVlNDtgYcy8uwRo3df3BUKFpIN6SmCZjYW5IFRFtQ0qtSJ55WtmXQBzwRwd45sGIgVkKrYZuY-hevcOOIohbZpF99Y7yKQeZJ_ufoZOSFa-IESG6MwMeJ2MgMdRMpvxpsrs7sYAHLLZNdUyGvrL3TPSSCTmPHw4walcRKTuEf5tgZRW94MjiAhwKYmPpujwzwcKiXqBkyewX1S9APLDIt8A6V7R27rvV7L1brDOVdwgO9pB28qBXJN0UuOyvA5Tly_-jXLytFqieAFz9e_r2sqmoDHRT20aBGCZnMUF_lmAPfp7wqFJYKz1fRKjumdKl8LaGpRNu45cXyoix2mdENnzcf1r6Oj-K7r7UgwquId_MZ2HwlQtJRsIyvWdftTox-xZ5CaqhFfRtBn6Kh2JABfKz_Y5v1NsKaGrer6rVdloer1aK6z6rCgQD7zsUYXX9SoXzF7OlP0QE3vKAw1hQT7wH2DGasSRn6gOoH_DfLCUc6me4mlpiYQXpnGhH-V8lv46_umxdE_jzHBIrioyL4Db12YbXNOTd4jFlxJAZp8Xl9lNvXsPsz_cGfLAIjLy37ui7-QbDE80448FwtSc8_UouW3zDmYrZGpMKCytVPfjziAS83iJ5q_QDmytFW6SjdhHC0HxuVmYkDPNz8IF7y_kkabEOJ0EyiPgdQhCp9L1xz0O5QDXcYbOEvapfNMnS6LdOsxGbHWGZZDzwp_AbD_LCxW_XW5jRJjVrh2zWqZ0GQiTueVdjqagdPMFWp-eJTuQeszoILzxqc5hzNck2ekbtWoWkT7AV1RpYlue8DLM8isW_HkuSM1u3Opj7_69_-yXBehvXhKyFuxKTBWJTb2bzk4OuuNj7ovMbS5I-b4vB-HSHhv6iH-tcPX9MyibRbTrJoKSaWHkxlsJC690o9fz1C9X1G5Z1iMtvKGAu4oiXrvxzIKLgCpxOQYHflV8V5QCrAM4g-qVDHdEsU3aNt8I8TxDV-B-v73eqbhK-fct49cSJGUeCludqw_vBBapXWaF3wqvZu-Kxe66su_PTjazH9FRB9r8aOlh-DODFVZnB9bdU1bNxt96BkTGHWj1yd-WuYlTng6hpjvy4ilvlYcLuNGhV5-jEtxwitJawF8E2cjfqJ9EotsaOyPGCgsAEXjkJTgAg7J9zuC8eAvFfZyVZbcZtpbC26L_mBxqBsBWqAKhJmemvLX5ULaflxI6aoz8NkuPqUohV8oKcp3FFGMjswNtY1g4RQsU5esyYbemOgNDQFLi-djgJhaU-y4r8yCzFYOuw5kgRk5ZccUD6U6q6t5wdUa7eIPNpPfMCUZfGysAKAvarEMK220j9wf5dotgqELq-U4KG8HiIdPOpg6kcNIoxFnO8EPWNagpKxqGGJQLXzxsh6KXPVXra1KmEelp75e-I4iZBcwP9Eckjm16ixf0u_GNGwQwS6aAhW0_oE1II09oVWAxj3DcJcsa27hdMQJ4j3BU1i2xpnzI6aE4HBtIuoAiwVxZ1d32Vx0OO8FjKr44clTlZZZJENWRS_YVozUBtuF498ihBy5fMJ03knsLUeUNxpoQN9mVpL3HveM8IOYqND232XsNqs564FMwM0bT9CIHl-qie1XijVesvJON82Tqzf_mCwCGD9SNop66iz-Lqa9OjE-P_uAWkASLPgMdwPtxc8fl7GYlt7QqoCE6Re_rA3-Cy4hXUYRQBjs4bslRD0Yv_TMr8ExAPNkxpAgx4T1pmIcRG_mvLoiTO1EVr1rJDMuMZzcMWnA6smn5gQCurYKzbAKWuZQnpW2ve8cOpJtEQ28kV_dIl2kEnTT_ZEO2hqyvzaQtcXvu8K8dAHMidF3NIeF5PkHD4iNhDAdlvvQlM13HLn_sJDLmLN9UaDW0aRaUOMheIeETZuqwD2sNTZVvlHrsXxlzQ0BX9vTzBHVMiQxXTmvtWKy08T_B-E2tTYSzcSD_mqlmnE1UMf8X_IOlptJZjh0NFFiiD9zgefC5CU7F1XndSNne57frgii2LdVhT0aioFIS0Exn_TlvvRmjczLl5tHiwVGaReVVvKa8UDdwr-KrWX2dyt4b873-TVuapAg1ip933WSfYAuzUAu7S7COlSIHhqGsNU9VcfEp_kssumYVTFGbpHUjSvlcDaSEE5H69PL9LDJpB0uyFo7VPyrlhXuLUD1o6Wlgnhq3jrYu7uV_dQhhITvfiz6fCzJknrmugBrQgcBoiEn4I05M7HSKIeyXM4QfO2OnEzhM_GNyWs7dThF3FKNb1-I7ljW0kVbZhWn8RbCWQR2FA; __RequestVerificationToken=VRcyqHL54UF7JMiPDR2be9DYFKqV7xRhPp5oSvaNLfUbl4oYXaGE5_keXL5nTR-i7Dz85Qotc-sB6kdvhNxVfphOTo41; _ga=GA1.2.79814887.1482601228; _ym_visorc_43292469=w; language=bg'
  }
}

module.exports = {
  getOptions : (urlPath) => {
    options.path = urlPath
    return options
  }
}