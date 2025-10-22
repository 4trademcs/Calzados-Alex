async function listFolder({ owner, repo, path, branch="main", token }) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
    const headers = { "Accept": "application/vnd.github+json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data
      .filter(x => x.type === "file" && /\.(png|jpe?g|webp|gif)$/i.test(x.name))
      .map(x => ({
        name: x.name,
        path: x.path,
        src: x.download_url,  // directo para <img>
        size: x.size,
        sha: x.sha,
      }));
  }
  