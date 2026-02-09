package linux

// FilesystemConfig captures high-level filesystem settings for sandbox setup.
type FilesystemConfig struct {
	WorkDir      string
	ReadonlyRoot bool
}

func defaultFilesystemConfig(workDir string, readonlyRoot bool) FilesystemConfig {
	return FilesystemConfig{
		WorkDir:      workDir,
		ReadonlyRoot: readonlyRoot,
	}
}
