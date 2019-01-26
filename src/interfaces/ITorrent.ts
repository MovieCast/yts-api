export interface IYtsTorrent {
    url: string;
    hash: string;
    quality: "720p" | "1080p" | "3D";
    type: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: string;
    date_uploaded: Date;
    date_uploaded_unix: number;
}
