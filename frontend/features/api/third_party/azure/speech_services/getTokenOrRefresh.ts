// https://zenn.dev/microsoft/articles/azure_next_english_lesson
// https://nextjs.org/docs/app/api-reference/functions/cookies
// next-auth
import { type Session } from 'next-auth';
// paths
import { thirdPartyPath } from '@/features/paths/backend';
// features
import { getAuthSession } from '@/features/nextauth';
import { BackendWithCredentialsApiClient } from '@/features/apiClients';
import { getCookie } from '@/features/utils';

// type
type getTokenOrRefreshProps = {
  setCookiePrefix?: string;
};
export type AzureTokenResponse = {
  accessToken: string;
  region:      string;
};
// getTokenOrRefresh
export async function getTokenOrRefresh({setCookiePrefix=''}: getTokenOrRefreshProps={},): Promise<AzureTokenResponse> {
  const speechToken = getCookie(`${setCookiePrefix}speech-token`);
  if (!speechToken) {
    try {
      // 再取得
      const session: Session | null = await getAuthSession();
      const res = await BackendWithCredentialsApiClient.post(
        thirdPartyPath.azure.speech_services.get_or_refresh,
        { setCookiePrefix: setCookiePrefix },
        { headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${session?.user?.accessToken}`,
        }},
      );
      return { accessToken: res.data?.accessToken, region: res.data?.region };
    } catch {
      return { accessToken: '', region: '' };
    };
  } else {
    try {
      // 持っていればそのまま返す(cookieStoreがなければ 空 を返す)
      const idx = speechToken.indexOf(':');
      return {
        accessToken: speechToken.slice(0, idx),
        region:      speechToken.slice(idx + 1),
      };
    } catch {
      return { accessToken: '', region: '' };
    };
  };
};