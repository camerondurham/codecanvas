package linux

import (
	"os"
	"path/filepath"
)

// FilesystemConfig captures high-level filesystem settings for sandbox setup.
type FilesystemConfig struct {
	WorkDir      string
	ReadonlyRoot bool
	RootDir      string
}

func defaultFilesystemConfig(workDir string, readonlyRoot bool) FilesystemConfig {
	return FilesystemConfig{
		WorkDir:      workDir,
		ReadonlyRoot: readonlyRoot,
	}
}

func ensureWorkDir(workDir string) error {
	return os.MkdirAll(workDir, 0o755)
}

func writeSourceFiles(workDir string, sourceFiles map[string][]byte) error {
	for name, data := range sourceFiles {
		path := filepath.Join(workDir, name)
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			return err
		}
		if err := os.WriteFile(path, data, 0o644); err != nil {
			return err
		}
	}
	return nil
}
