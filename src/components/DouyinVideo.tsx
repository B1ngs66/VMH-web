import { publicPath } from "@/lib/site-path";

export function DouyinVideo({ locale }: { locale: "zh" | "en" }) {
  return (
    <div className="project-video">
      <video
        autoPlay
        muted
        controls
        playsInline
        preload="metadata"
        aria-label={
          locale === "zh"
            ? "大灣區湖南人足球隊抖音影片"
            : "Greater Bay Area Hunan Football Team video"
        }
      >
        <source src={publicPath("/video/hunan-football-team.mp4")} type="video/mp4" />
        {locale === "zh"
          ? "您的瀏覽器不支援影片播放。"
          : "Your browser does not support video playback."}
      </video>
    </div>
  );
}
